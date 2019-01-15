module.exports = ({ markup }) => `
  <html>
    <link rel="stylesheet" type="text/css" href="/app.css">
    <script type="text/javascript" src="/app.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <body>
      <div id="appRoot">${markup}</div>
    </body>
  </html>
`;
