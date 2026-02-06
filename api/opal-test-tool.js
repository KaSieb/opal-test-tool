// Proxy-Handler für Opal Chat
export default async function handler(req, res) {
  const vercelEndpoint = "https://opal-test-tool-7wj4.vercel.app/api/opal-test-tool";

  if (req.method === "POST") {
    // Eingabe vom Chat
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Parameter 'input' fehlt." });
    }

    try {
      // Anfrage an Vercel-Endpoint weiterleiten
      const response = await fetch(vercelEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      });

      const data = await response.json();

      // Antwort direkt an Opal Chat zurückgeben
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Fehler beim Proxy-Request an Vercel." });
    }

  } else {
    // Discovery Manifest für Opal
    res.status(200).json({
      functions: [
        {
          name: "opal_test_tool",
          description: "Mein Test Tool für Opal (via Proxy)",
          http_method: "POST",
          endpoint: "/tools/proxy", // Interner Opal-Endpoint
          parameters: [
            {
              name: "input",
              type: "string",
              description: "Eingabeparameter für das Tool",
              required: true
            }
          ]
        }
      ]
    });
  }
}
