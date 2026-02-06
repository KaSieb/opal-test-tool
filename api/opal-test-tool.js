// /api/opal-test-tool.js
export default async function handler(req, res) {
  const fullUrl = "https://opal-test-tool-7wj4.vercel.app/api/opal-test-tool";

  if (req.method === "POST") {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Parameter 'input' fehlt." });

    return res.status(200).json({ output: `Du hast eingegeben: ${input}` });
  } else {
    res.status(200).json({
      functions: [
        {
          name: "opal_test_tool",
          description: "Mein Test Tool für Opal",
          http_method: "POST",
          endpoint: fullUrl, // absolute URL für Opal Chat
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
