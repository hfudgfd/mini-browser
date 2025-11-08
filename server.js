import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing ?url parameter");

  try {
    const response = await axios.get(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (ProxyBrowser)" },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(`Error fetching ${targetUrl}: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});
