import { env } from "@/env";
import { prisma } from "@/prisma";
import { stripe } from "@/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const body = await req.text();

  const sig = req.headers.get("Stripe-Signature");

  if (!sig) {
    return NextResponse.json({ error: "No stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Invalid stripe signature` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // const priceId = session.line_items?.data[0].price?.id;
      // if (!priceId) {
      //   return NextResponse.json({ error: "Price not found" }, { status: 404 });
      // }

      // if (
      //   priceId === "prod_QfNM3Xg8IrTkUS" ||
      //   priceId === "price_1Po2cURrqlkQ8Q6rPd9XeDII" ||
      //   priceId === "prod_QfNNi6n5uV4L8j"
      // ) {
      const customerId = session.customer as string;

      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: customerId },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { plan: "PREMIUM" },
      });
      // }

      break;
    }
    case "invoice.paid": {
      // continue to set the user premium
      const invoice = event.data.object as Stripe.Invoice;

      const customerId = invoice.customer as string;

      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: customerId },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { plan: "PREMIUM" },
      });
    }
    case "customer.subscription.deleted": {
      //Remove the premium plan
      const subscription = event.data.object as Stripe.Subscription;

      const customerId = subscription.customer as string;

      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: customerId },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { plan: "FREE" },
      });
    }
    default:
      console.log("Unhandled event");
  }

  return NextResponse.json({ received: true });
};
