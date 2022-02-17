export default function handler(req, res) {
  const discord = await fetch(`https://discord.com/api/v9/invites/nwMzftWJt7?with_counts=true&with_expiration=true`);
  const data = discord.data;
  const members = data.approximate_member_count;
  const online = data.approximate_presence_count;

  res.status(200).json({ members, online });
}
