export default async function handler(req, res) {
  const vercelEndpoint = "https://opal-test-tool-7wj4.vercel.app/api/opal-test-tool";

  if (req.method === "POST") {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Parameter 'input' fehlt." });

    try {
      const response = await fetch(vercelEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Fehler beim Proxy-Request an Vercel." });
    }
  } else {
    res.status(200).json({
      functions: [
        {
          name: "opal_test_tool",
          description: "Mein Test Tool für Opal (via Proxy)",
          http_method: "POST",
          endpoint: "/tools/proxy",
          parameters: [
            { name: "input", type: "string", description: "Eingabeparameter", required: true }
          ]
        }
      ]
    });
  }
}
