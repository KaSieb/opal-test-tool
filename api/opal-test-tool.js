// /api/opal-test-tool.js
export default function handler(req, res) {
  // Das JSON ist das Tool-Manifest für Opal
  res.status(200).json({
    functions: [
      {
        name: "opal_test_tool",               // Name, der in Opal angezeigt wird
        description: "Mein Test Tool für Opal", // Beschreibung in Opal
        http_method: "POST",                  // HTTP-Methode, die Opal zum Aufruf nutzt
        endpoint: "/api/opal-test-tool",      // Pfad für die Funktion
        parameters: [                         // Parameterdefinition für Opal
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
