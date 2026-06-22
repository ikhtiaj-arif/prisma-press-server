import { title } from "node:process";
import { prisma } from "./lib/prisma";

async function main() {

  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@gmail.com",
      posts: {
        create: {
          title: "first ",
          content: "title",
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
