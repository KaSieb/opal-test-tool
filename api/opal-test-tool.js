// /api/opal-test-tool.js
export default async function handler(req, res) {
  const baseUrl = "https://opal-test-tool-7wj4.vercel.app"; // <-- Dein Vercel-Projekt-URL

  if (req.method === "POST") {
    // Tool-Ausführung
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Parameter 'input' fehlt." });
    }

    // Beispiel-Verarbeitung: einfach Echo
    const output = `Du hast eingegeben: ${input}`;

    return res.status(200).json({ output });
  } else {
    // Discovery Manifest für Opal
    res.status(200).json({
      functions: [
        {
          name: "opal_test_tool",               // Name in Opal
          description: "Mein Test Tool für Opal", // Beschreibung
          http_method: "POST",                  // HTTP-Methode für Ausführung
          endpoint: `${baseUrl}/api/opal-test-tool`, // volle URL für Opal
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
