export default async function handler(req, res) {
  try {
    const discord = await fetch(`https://discord.com/api/v9/invites/nwMzftWJt7?with_counts=true&with_expiration=true`);
    const data = discord.data;
    const members = data.approximate_member_count;
    const online = data.approximate_presence_count;

    res.status(200).json({ members, online });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
