export default function handler(req, res) {
  setTimeout(() => {
    res.status(200).json({ text: 'Hello' })
  }, 3000);
}