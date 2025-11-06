<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <div class="topside">
        <div class="top-content">
            <h2>Total: €<span id="total-cost">0.00</span></h2>
            <div class="top-buttons">
            <button id="save-btn">💾 Save</button>
            <input type="file" id="load-input" accept=".json" hidden>
            <button id="load-btn">📁 Load</button>
            <button id="clear-btn">🧹 Clear</button>
            <button id="download-btn">🖼️ Download Image</button>
            </div>
        </div>
    </div>


    <div class="botside">
        <div class="leftside">
            <div class="item-list" id="item-list">
                <p>Items will load here</p>
            </div>
        </div>
        <div class="rightside">
            <div class="panel">
                
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
    <script src="script.js"></script>
</body>
</html>