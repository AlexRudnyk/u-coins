"use server";

import { revalidatePath } from "next/cache";

import connect from "../db";

import Coin from "./models/Coin";
// import { CoinType } from "./types/coin";
// import { CommentType } from "./types/comment";

// type QueryType = { year: string; title: string };

export async function getAllCoins(fromPrice?: number, toPrice?: number) {
  console.log("RANGE", fromPrice, toPrice);
  //   const pageNum = page || 1;
  //   const limit = 8;

  //   const skip = (pageNum - 1) * limit;

  //   let query: QueryType = { year: "", title: "" };

  //   if (year !== undefined && year !== "") {
  //     query["year"] = year;
  //   }

  //   if (title !== undefined && title !== "") {
  //     query["title"] = title;
  //   }

  try {
    await connect();

    // if () {
    //   const coins = await Coin.find({
    //     price: { $gt: fromPrice, $lt: toPrice },
    //   });
    // }
    const coins =
      fromPrice && toPrice
        ? await Coin.find({ price: { $gt: fromPrice, $lt: toPrice } })
        : await Coin.find();
    const count = await Coin.find().countDocuments();
    const response = { coins, count };

    return response;
  } catch (error) {
    console.log(error);
    return { coins: [], count: 0 };
  }
  revalidatePath("/");
}

// export async function addCoin(values: CoinType) {
//   try {
//     await connect();

//     await Coin.create({
//       title: values.title,
//       year: values.year,
//       spec: values.spec,
//       price: values.price,
//       description: values.description,
//       photoURL: values.photoURL,
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   revalidatePath("/");
// }

// export async function getCoinById(id: string) {
//   try {
//     await connect();

//     const coin = await Coin.findById({ _id: id });
//     return coin;
//   } catch (error) {
//     console.log(error);
//   }
//   revalidatePath("/");
// }

// export async function deleteCoin(id: string) {
//   try {
//     await connect();

//     await Coin.findByIdAndDelete({ _id: id });
//   } catch (error) {
//     console.log(error);
//   }
//   revalidatePath("/");
// }

// export async function addComment(
//   { userName, text }: { userName: string; text: string },
//   id: string
// ) {
//   try {
//     await connect();

//     const coin = await Coin.findById({ _id: id });

//     if (!coin) {
//       console.log("Coin is not found");
//       return;
//     }

//     coin.comments.unshift({ userName, text });

//     await coin.save();
//   } catch (error) {
//     console.log(error);
//   }
//   revalidatePath("/coin/[id]", "page");
// }

// export async function deleteComment(coinId: string, commentId: string) {
//   try {
//     await connect();

//     const coin = await Coin.findById({ _id: coinId });

//     if (!coin) {
//       console.log("Coin is not found");
//       return;
//     }

//     coin.comments = coin.comments.filter(
//       (comment: CommentType) => comment._id?.toString() !== commentId
//     );

//     await coin.save();
//   } catch (error) {
//     console.log(error);
//   }
//   revalidatePath("/coin/[id]", "page");
// }

// export async function replyComment(
//   text: string,
//   coinId: string,
//   commentId: string
// ) {
//   try {
//     await connect();

//     const coin = await Coin.findById({ _id: coinId });
//     if (!coin) {
//       console.log("Coin is not found");
//       return;
//     }

//     const comment = coin.comments.find(
//       (comment: CommentType) => comment._id?.toString() === commentId
//     );
//     if (!comment) {
//       console.log("Comment is not found");
//       return;
//     }

//     comment.reply = text;

//     await coin.save();
//   } catch (error) {
//     console.log(error);
//   }
//   revalidatePath("/coin/[id]", "page");
// }
