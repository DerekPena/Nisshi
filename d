[1mdiff --git a/public/darian.png b/public/darian.png[m
[1mnew file mode 100644[m
[1mindex 0000000..70ade3c[m
Binary files /dev/null and b/public/darian.png differ
[1mdiff --git a/public/figma1.png b/public/figma1.png[m
[1mnew file mode 100644[m
[1mindex 0000000..5db164a[m
Binary files /dev/null and b/public/figma1.png differ
[1mdiff --git a/public/gamer.png b/public/gamer.png[m
[1mnew file mode 100644[m
[1mindex 0000000..c79c3b1[m
Binary files /dev/null and b/public/gamer.png differ
[1mdiff --git a/public/phanapy_image.png b/public/phanapy_image.png[m
[1mnew file mode 100644[m
[1mindex 0000000..4d76057[m
Binary files /dev/null and b/public/phanapy_image.png differ
[1mdiff --git a/public/sano.png b/public/sano.png[m
[1mnew file mode 100644[m
[1mindex 0000000..9bdf383[m
Binary files /dev/null and b/public/sano.png differ
[1mdiff --git a/public/sano1.png b/public/sano1.png[m
[1mnew file mode 100644[m
[1mindex 0000000..5839e9b[m
Binary files /dev/null and b/public/sano1.png differ
[1mdiff --git a/public/tiff.png b/public/tiff.png[m
[1mnew file mode 100644[m
[1mindex 0000000..eba22c5[m
Binary files /dev/null and b/public/tiff.png differ
[1mdiff --git a/src/frontend/css/App.css b/src/frontend/css/App.css[m
[1mnew file mode 100644[m
[1mindex 0000000..361d82d[m
[1m--- /dev/null[m
[1m+++ b/src/frontend/css/App.css[m
[36m@@ -0,0 +1,59 @@[m
[32m+[m[32m.App {[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  /* background-color: #006189; */[m
[32m+[m[32m  background: rgb(0,97,137);[m
[32m+[m[32m  background: linear-gradient(90deg, rgba(0,97,137,1) 0%, rgba(99,0,137,1) 100%);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.App-header {[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-direction: column;[m
[32m+[m[32m  max-height: 1vh;[m
[32m+[m[32m  max-width: fit-content;[m
[32m+[m[32m  margin: auto;[m
[32m+[m[32m  font-size: calc(6px + 6vmin);[m
[32m+[m[32m  font-weight: bold;[m
[32m+[m[32m  color: white;[m
[32m+[m[32m  transition: color 0.2s;[m
[32m+[m
[32m+[m[32m  font-family: 'Patua One', cursive;[m
[32m+[m[32m  padding-top: 0.8em;[m
[32m+[m[32m  padding-bottom: 0.8em;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.sub-header{[m
[32m+[m[32m  font-size: calc(4px + 3vmin);[m
[32m+[m[32m  color: #ffb400;[m
[32m+[m[32m  transition: color 0.2s;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.App-header:hover {[m
[32m+[m[32m  color: #ff9500;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.sub-header:hover {[m
[32m+[m[32m  color: #ffe19a;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.App-content {[m
[32m+[m[32m  min-height: 100vh;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-direction: column;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  padding-top: 15vh;[m
[32m+[m[32m  font-size: calc(5px + 2vmin);[m
[32m+[m[32m  color: white;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Stand-by CSS for Google Fonts */[m
[32m+[m[32m/*[m
[32m+[m[32mfont-family: 'Heebo', sans-serif;[m
[32m+[m[32mfont-family: 'Kiwi Maru', serif;[m
[32m+[m[32mfont-family: 'Kranky', cursive;[m
[32m+[m[32mfont-family: 'Lobster', cursive;[m
[32m+[m[32mfont-family: 'M PLUS Rounded 1c', sans-serif;[m
[32m+[m[32mfont-family: 'Mohave', sans-serif;[m
[32m+[m[32mfont-family: 'Patua One', cursive;[m
[32m+[m[32mfont-family: 'Quicksand', sans-serif;[m
[32m+[m[32m*/[m
\ No newline at end of file[m
[1mdiff --git a/src/frontend/css/auth-form.css b/src/frontend/css/auth-form.css[m
[1mnew file mode 100644[m
[1mindex 0000000..5493858[m
[1m--- /dev/null[m
[1m+++ b/src/frontend/css/auth-form.css[m
[36m@@ -0,0 +1,30 @@[m
[32m+[m[32m.login-form{[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    flex-direction: column;[m
[32m+[m[32m    width: 250px;[m
[32m+[m[32m    color: #ffb400;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.label{[m
[32m+[m[32m    text-align: left;[m
[32m+[m[32m    padding-bottom: 5px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.input-field {[m
[32m+[m[32m    margin-bottom: 25px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.button {[m
[32m+[m[32m    background-color:#ffb400;[m
[32m+[m[32m    max-width: fit-content;[m
[32m+[m[32m    align-self: center;[m
[32m+[m[32m    transition: background-color 0.2s;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.button:hover{[m
[32m+[m[32m    background-color: rgba(134, 94, 0, 0.962)[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.radio-button {[m
[32m+[m[32m    padding-bottom: 18px;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/src/frontend/css/index.css b/src/frontend/css/index.css[m
[1mnew file mode 100644[m
[1mindex 0000000..1aafe4c[m
[1m--- /dev/null[m
[1m+++ b/src/frontend/css/index.css[m
[36m@@ -0,0 +1,25 @@[m
[32m+[m[32mbody {[m
[32m+[m[32m  margin: 0;[m
[32m+[m[32m  padding: 0;[m
[32m+[m[32m  height: 100vh;[m
[32m+[m[32m  width: 100vw;[m
[32m+[m[32m  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',[m
[32m+[m[32m    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',[m
[32m+[m[32m    sans-serif;[m
[32m+[m[32m  -webkit-font-smoothing: antialiased;[m
[32m+[m[32m  -moz-osx-font-smoothing: grayscale;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mcode {[m
[32m+[m[32m  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',[m
[32m+[m[32m    monospace;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m* {[m
[32m+[m[32m  box-sizing: border-box;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#page-wrap {[m
[32m+[m[32m  padding-bottom: 10px;[m
[32m+[m[32m  padding-top: 10px;[m
[32m+[m[32m}[m
[1mdiff --git a/src/frontend/css/sidebar.css b/src/frontend/css/sidebar.css[m
[1mnew file mode 100644[m
[1mindex 0000000..c1cd15c[m
[1m--- /dev/null[m
[1m+++ b/src/frontend/css/sidebar.css[m
[36m@@ -0,0 +1,103 @@[m
[32m+[m[32m#subtext {[m
[32m+[m[32m  font-family: 'Raleway', sans-serif;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Position and sizing of burger button */[m
[32m+[m[32m.bm-burger-button {[m
[32m+[m[32m    position: fixed;[m
[32m+[m[32m    width: 36px;[m
[32m+[m[32m    height: 30px;[m
[32m+[m[32m    left: 36px;[m
[32m+[m[32m    top: 36px;[m
[32m+[m[32m  }[m
[32m+[m[41m  [m
[32m+[m[32m/* Color/shape of burger icon bars */[m
[32m+[m[32m.bm-burger-bars {[m
[32m+[m[32m  background: #fd9e02;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Color/shape of burger icon bars on hover*/[m
[32m+[m[32m.bm-burger-bars-hover {[m
[32m+[m[32m  background: #fd9e02;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Position and sizing of clickable cross button */[m
[32m+[m[32m.bm-cross-button {[m
[32m+[m[32m  height: 24px;[m
[32m+[m[32m  width: 24px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Color/shape of close button cross */[m
[32m+[m[32m.bm-cross {[m
[32m+[m[32m  background: #fd9e02;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/*[m
[32m+[m[32mSidebar wrapper styles[m
[32m+[m[32mNote: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases[m
[32m+[m[32m*/[m
[32m+[m[32m.bm-menu-wrap {[m
[32m+[m[32m  position: fixed;[m
[32m+[m[32m  height: 100%;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* General sidebar styles */[m
[32m+[m[32m.bm-menu {[m
[32m+[m[32m  background: #0D709A;[m
[32m+[m[32m  padding: 2.5em 1.5em 0;[m
[32m+[m[32m  font-size: 1.15em;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Morph shape necessary with bubble or elastic */[m
[32m+[m[32m.bm-morph-shape {[m
[32m+[m[32m  fill: #373a47;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Wrapper for item list */[m
[32m+[m[32m.bm-item-list {[m
[32m+[m[32m  color: #b8b7ad;[m
[32m+[m[32m  padding: 0.8em;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Individual item */[m
[32m+[m[32m.bm-item {[m
[32m+[m[32m  display: inline-block;[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  font-size: 30px;[m
[32m+[m[32m  margin-bottom: 10px;[m
[32m+[m[32m  text-align: left;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m  transition: color 0.2s;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.bm-item:hover {[m
[32m+[m[32m  color: #73bfb8;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m
[32m+[m[32m/* Styling of overlay */[m
[32m+[m[32m.bm-overlay {[m
[32m+[m[32m  background: rgba(0, 0, 0, 0.3);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.title {[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  display: block;[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  font-size: 30px;[m
[32m+[m[32m  margin-bottom: 0px;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m  transition: color 0.2s;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.subtitle {[m
[32m+[m[32m  display: block;[m
[32m+[m[32m  color: #fd9e02;[m
[32m+[m[32m  font-size: 15px;[m
[32m+[m[32m  margin-bottom: 0px;[m
[32m+[m[32m  margin-top: 0px;[m
[32m+[m[32m  margin-left: 30px;[m
[32m+[m[32m  text-align: left;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m  transition: color 0.2s;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/src/frontend/css/startpage.css b/src/frontend/css/startpage.css[m
[1mnew file mode 100644[m
[1mindex 0000000..8860ec5[m
[1m--- /dev/null[m
[1m+++ b/src/frontend/css/startpage.css[m
[36m@@ -0,0 +1,190 @@[m
[32m+[m[32m.start-page {[m
[32m+[m[32m    /* display: flex; */[m
[32m+[m[32m    /* flex-direction: column; */[m
[32m+[m[41m    [m
[32m+[m[32m    /* max-width: 100vh; */[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.button {[m
[32m+[m[32m    background-color:#ffb400;[m
[32m+[m[32m    max-width: fit-content;[m
[32m+[m[32m    align-self: center;[m
[32m+[m[32m    transition: background-color 0.2s;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.button:hover{[m
[32m+[m[32m    background-color: rgba(134, 94, 0, 0.962)[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#login, #register {[m
[32m+[m[32m    width: 12em;[m
[32m+[m[32m    color: #301263;[m
[32m+[m[32m    background: #ffb400;[m
[32m+[m[32m    font-style: bold;[m
[32m+[m[32m    font-size: 24px;[m
[32m+[m[32m    margin: 10px;[m
[32m+[m[32m    border-radius: 20px;[m
[32m+[m
[32m+[m[32m    font-family: 'Patua One', cursive;[m
[32m+[m[32m    font-weight: 400;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#login:hover span, #register:hover span {[m
[32m+[m[32m    display: none;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#login:hover, #register:hover {[m
[32m+[m[32m    background-color: #ff9500;[m
[32m+[m[32m    color: #301263;[m
[32m+[m[32m    font-family: 'M PLUS Rounded 1c', sans-serif;[m
[32m+[m[32m    font-weight: 700;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#login:hover:before {[m
[32m+[m[32m    content:"ログイン";[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#register:hover:before {[m
[32m+[m[32m    content:"ニュー・アカウント";[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#text1 {[m
[32m+[m[32m    font-family: 'M PLUS Rounded 1c', sans-serif;[m
[32m+[m[32m    font-weight: 800;[m
[32m+[m[32m    font-size: 44px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#text2 {[m
[32m+[m[32m    font-family: 'Patua One', cursive;[m
[32m+[m[32m    font-weight: 500;[m
[32m+[m[32m    padding-top: 10px;[m
[32m+[m[32m    padding-bottom: 20px;[m
[32m+[m[32m    font-size: 44px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#text3 {[m
[32m+[m[32m    font-family: 'Patua One', cursive;[m
[32m+[m[32m    font-weight: 500;[m
[32m+[m[32m    padding-bottom: 5px;[m
[32m+[m[32m    font-size: 24px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#text4 {[m
[32m+[m[32m    font-family: 'Patua One', cursive;[m
[32m+[m[32m    font-weight: 500;[m
[32m+[m[32m    font-size: 38px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#text5 {[m
[32m+[m[32m    font-family: 'Patua One', cursive;[m
[32m+[m[32m    font-weight: 500;[m
[32m+[m[32m    padding-top: 10px;[m
[32m+[m[32m    font-size: 44px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#graphic {[m
[32m+[m[32m    padding: 10px;[m
[32m+[m[32m    width: 50vh;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.row {[m
[32m+[m[32m    margin-bottom: 2em;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#figma {[m
[32m+[m[32m    width: 70vh;[m
[32m+[m[32m    border: 5px solid #ffffff;[m
[32m+[m[32m    border-radius: 20px;[m
[32m+[m[32m    max-width: 100vh;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#sidetext {[m
[32m+[m[32m    /* display: flex;[m
[32m+[m[32m    justify-content: center;[m
[32m+[m[32m    align-items: center;[m
[32m+[m[32m    height: 100vh; */[m
[32m+[m[32m    padding-top: 1.5em;[m
[32m+[m[32m    padding-bottom: 1.5em;[m
[32m+[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#bullet {[m
[32m+[m[32m    padding-left: 1.5em;[m
[32m+[m[32m    padding-right: 1.5em;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mli {[m
[32m+[m[32m    font-family: 'Patua One', cursive !important;[m
[32m+[m[32m    font-weight: 400;[m
[32m+[m[32m    font-size: 22px !important;[m
[32m+[m[32m    text-align: left;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#first-section {[m
[32m+[m[32m    margin-bottom: 6em;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Third Section -- Meet the Nisshi Team */[m
[32m+[m[32m.card {[m
[32m+[m[32m    opacity: 0.86;[m
[32m+[m[32m    background-color: rgba(229, 228, 255, 0.937);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.card-body {[m
[32m+[m[32m    opacity: 1 !important;[m
[32m+[m[32m    height: 50vh;[m
[32m+[m[32m    justify-content: center;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.card-title {[m
[32m+[m[32m   font-size: 34px;[m[41m [m
[32m+[m[32m   font-family: 'Patua One', cursive;[m
[32m+[m[32m   color: #301263;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#card-text {[m
[32m+[m[32m    font-size: 18px;[m
[32m+[m[32m    font-family: 'Quicksand', sans-serif;[m
[32m+[m[32m    font-weight: 600;[m
[32m+[m[32m    color: #312178;[m
[32m+[m[32m    padding-top: 1em;[m
[32m+[m[32m }[m
[32m+[m
[32m+[m[32m #card-icon {[m
[32m+[m[32m    /* width: 25vh; */[m
[32m+[m[32m    height: 24vh;[m
[32m+[m[32m    border-radius: 50%;[m
[32m+[m[32m    padding-bottom: 1em;[m
[32m+[m[32m }[m
[32m+[m
[32m+[m[32m .card-title:hover span {[m
[32m+[m[32m    display: none;[m
[32m+[m[32m }[m
[32m+[m
[32m+[m[32m #sano:hover:before {[m
[32m+[m[32m    content: "佐野 僚亮";[m
[32m+[m[32m    font-family: 'M PLUS Rounded 1c', sans-serif;[m
[32m+[m[32m    font-weight: 700;[m
[32m+[m[32m    font-size: 26px;[m
[32m+[m[32m }[m
[32m+[m
[32m+[m[32m #darian:hover:before {[m
[32m+[m[32m    content: "ダーリアン・チューング";[m
[32m+[m[32m    font-family: 'M PLUS Rounded 1c', sans-serif;[m
[32m+[m[32m    font-weight: 800;[m
[32m+[m[32m    font-size: 24px;[m
[32m+[m[32m }[m
[32m+[m
[32m+[m[32m #derek:hover:before {[m
[32m+[m[32m    content: "デレック・ペナー";[m
[32m+[m[32m    font-family: 'M PLUS Rounded 1c', sans-serif;[m
[32m+[m[32m    font-weight: 800;[m
[32m+[m[32m    font-size: 26px;[m
[32m+[m[32m }[m
[32m+[m
[32m+[m[32m #tiff:hover:before {[m
[32m+[m[32m    content: "ティファニー・ウー";[m
[32m+[m[32m    font-family: 'M PLUS Rounded 1c', sans-serif;[m
[32m+[m[32m    font-weight: 800;[m
[32m+[m[32m    font-size: 26px;[m
[32m+[m[32m }[m
\ No newline at end of file[m
[1mdiff --git a/src/frontend/css/wordbank.css b/src/frontend/css/wordbank.css[m
[1mnew file mode 100644[m
[1mindex 0000000..7c3ec96[m
[1m--- /dev/null[m
[1m+++ b/src/frontend/css/wordbank.css[m
[36m@@ -0,0 +1,43 @@[m
[32m+[m[32m#wordbank {[m
[32m+[m[32m    width: 200px;[m
[32m+[m[32m    height: 90vh;[m
[32m+[m[32m    background-color: #ffffff;[m
[32m+[m[32m    font: 32px;[m
[32m+[m[32m    color: #277DA1;[m
[32m+[m[32m    /*font-style: Lexend;*/[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#wordbank-top {[m
[32m+[m[32m    width: 200px;[m
[32m+[m[32m    height: 20vh;[m
[32m+[m[32m    color: #FFB400;[m
[32m+[m[32m    border-top-left-radius: 25px;[m
[32m+[m[32m    border-top-right-radius: 25px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m#wordbank-bottom {[m
[32m+[m[32m    width: 200px;[m
[32m+[m[32m    height: 5vh;[m
[32m+[m[32m    color: #FFB400;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/*firefox*/[m
[32m+[m[32m* {[m
[32m+[m[32m    scrollbar-width: auto;[m
[32m+[m[32m    scrollbar-color: #ffbe0a #ffffff;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* chrome, edge, safari*/[m
[32m+[m[32m*::-webkit-scrollbar {[m
[32m+[m[32m    width: 17px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m*::-webkit-scrollbar-track {[m
[32m+[m[32m    background: #ffffff;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m*::-webkit-scrollbar-thumb {[m
[32m+[m[32m    background-color: #FFB400;[m
[32m+[m[32m    border-radius: 8px;[m
[32m+[m[32m    border: 4px solid #ffffff;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/src/frontend/wordbank.js b/src/frontend/wordbank.js[m
[1mnew file mode 100644[m
[1mindex 0000000..eb80e4d[m
[1m--- /dev/null[m
[1m+++ b/src/frontend/wordbank.js[m
[36m@@ -0,0 +1,32 @@[m
[32m+[m[32mimport React from 'react';[m
[32m+[m[32m// import React, { useState } from 'react'[m
[32m+[m[32mimport './css/wordbank.css';[m
[32m+[m
[32m+[m[32mexport default props => {[m
[32m+[m[32m    const handleSave = (e) => {[m
[32m+[m[32m        e.preventDefault();[m
[32m+[m
[32m+[m[32m        fetch("http://localhost:5000/journal", {[m
[32m+[m[32m            method: 'POST',[m
[32m+[m[32m            headers: { 'Content-type': 'application/json' },[m
[32m+[m[32m            body: JSON.stringify({title, entry, id})[m
[32m+[m[32m        })[m
[32m+[m[32m            .then(response => response.json())[m
[32m+[m[32m            .catch(error => { console.log("Error: ", error) })[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    //loops through list of vocabulary[m
[32m+[m[32m    function getVocabulary() {[m
[32m+[m[32m        fetch("http://localhost:5000/vocabulary", {[m
[32m+[m[32m            method: 'POST',[m
[32m+[m[32m            headers: {'Content-type' : 'application/json'},[m
[32m+[m[41m            [m
[32m+[m[32m        })[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    return ([m
[32m+[m[32m        <div id="wordbank">[m
[32m+[m
[32m+[m[32m        </div>[m
[32m+[m[32m    );[m
[32m+[m[32m};[m
\ No newline at end of file[m
