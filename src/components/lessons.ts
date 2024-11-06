export const lessons = [
    {
      title: "Basic HTML Injection",
      content: "HTML injection starts with simple HTML elements. This example shows how user input can modify the page structure:",
      example: "<h1 style='color: red'>This text is injected</h1><p>Notice how HTML styling works!</p>"
    },
    {
      title: "Script Injection (XSS)",
      content: "This example demonstrates a basic XSS attack using JavaScript. In the unsafe preview, you'll see an alert box pop up:",
      example: "<img src='x' onerror='alert(\"XSS Attack Demonstration!\")'>"
    },
    {
      title: "DOM-Based Injection",
      content: "Attackers can manipulate the DOM structure. This example tries to modify the page layout:",
      example: "<div style='position:fixed;top:0;left:0;background:black;color:red;padding:20px;width:100%'>Injected Header</div>"
    },
    {
      title: "Advanced XSS Techniques",
      content: "This example shows how attackers might try to bypass filters using HTML entities and encoded characters:",
      example: "<img src='x' OnErRoR=alert&#40;1&#41; /><script>alert('test')</script>"
    }
  ];