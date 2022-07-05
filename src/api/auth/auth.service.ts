import db from "../../client";

async function hello() {
  const users = await db.user.findMany({
    include: { posts: true },
  });

  return users;
}

export default { hello };
