// /api/opal-test-tool.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Tool-Ausführung
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ error: "Parameter 'input' fehlt." });
    }
    return res.status(200).json({ output: `Du hast eingegeben: ${input}` });
  } else {
    // Discovery Manifest
    res.status(200).json({
      functions: [
        {
          name: "opal_test_tool",
          description: "Mein Test Tool für Opal",
          http_method: "POST",
          endpoint: "/api/opal-test-tool", // **relativ zur discovery URL**
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
