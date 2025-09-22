
(function(){
  // Simple client-side password "gate" (not strong security; good for surprises)
  function ensureAccess(){
    const ok = sessionStorage.getItem("advent_ok") === "1";
    if(ok) return true;
    const pwd = prompt("Passwort eingeben, bitte:");
    if(pwd === window.ADVENT_CONFIG.PASSWORD){
      sessionStorage.setItem("advent_ok","1");
      return true;
    } else {
      alert("Falsches Passwort. Versuche es noch einmal.");
      location.href = "../index.html";
      return false;
    }
  }
  window.adventEnsureAccess = ensureAccess;

  // Normalize user input for checking
  function norm(s){
    return (s||"")
      .toLowerCase()
      .replace(/\s+/g,"")
      .replace(/[ä]/g,"ae")
      .replace(/[ö]/g,"oe")
      .replace(/[ü]/g,"ue")
      .replace(/[ß]/g,"ss");
  }
  window.adventNorm = norm;

  // Check answer utility
  window.checkAnswer = function(inputEl, answers, onSuccess, onFail){
    const value = norm(inputEl.value);
    const list = (Array.isArray(answers)?answers:(""+answers).split("|")).map(norm);
    const ok = list.includes(value);
    if(ok){
      onSuccess && onSuccess();
    }else{
      onFail && onFail();
    }
  };

  // Small confetti using emoji fallback
  window.fireConfetti = function(){
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.left = 0; el.style.top = 0; el.style.right = 0; el.style.bottom = 0;
    el.style.pointerEvents = "none";
    el.style.zIndex = 9999;
    const count = 60;
    for(let i=0;i<count;i++){
      const s = document.createElement("div");
      s.textContent = ["✨","🎉","❄️","💖"][i%4];
      s.style.position="absolute";
      s.style.left = Math.random()*100+"%";
      s.style.top = "-10%";
      s.style.fontSize = (16+Math.random()*20)+"px";
      s.style.animation = `fall ${3+Math.random()*2}s linear ${Math.random()}s forwards`;
      el.appendChild(s);
    }
    const style = document.createElement("style");
    style.textContent = `@keyframes fall{to{transform:translateY(120vh) rotate(360deg);opacity:.2}}`;
    document.head.appendChild(style);
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),6000);
  };

  // Inject header title
  window.injectHeader = function(){
    const h = document.querySelector("#title");
    if(h && window.ADVENT_CONFIG?.TITLE) h.textContent = window.ADVENT_CONFIG.TITLE;
  }
})();
