const pages = [...document.querySelectorAll(".page")];
const nav = [...document.querySelectorAll(".nav-item")];
function go(page) {
  pages.forEach((p) => p.classList.toggle("active", p.id === page));
  nav.forEach((n) => n.classList.toggle("active", n.dataset.page === page));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-page]");
  if (el) go(el.dataset.page);
});
document
  .querySelectorAll(".quick button")
  .forEach((b) =>
    b.addEventListener("click", () => sendMessage(b.textContent))
  );
document.getElementById("chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  if (input.value.trim()) sendMessage(input.value.trim());
  input.value = "";
});
function sendMessage(text) {
  const chat = document.getElementById("chat");
  const q = document.querySelector(".quick");
  if (q) q.remove();
  const user = document.createElement("div");
  user.className = "bubble user";
  user.textContent = text;
  chat.appendChild(user);
  const bot = document.createElement("div");
  bot.className = "bubble bot";
  bot.textContent = reply(text);
  chat.appendChild(bot);
  chat.scrollTop = chat.scrollHeight;
}
function reply(t) {
  const s = t.toLowerCase();
  if (s.includes("مسموح") || s.includes("طعام"))
    return "أستطيع مساعدتك في تصنيف الطعام حسب قائمة الطيبات داخل التطبيق. إذا لم يكن الطعام موجودًا، لا تفترض أنه مسموح؛ أخبرني باسمه وسأقترح عليك خيارًا أكثر أمانًا ضمن النظام.";
  if (s.includes("تمرين") || s.includes("رياض"))
    return "لليوم أقترح نشاطًا خفيفًا يناسب مستواك، مثل مشي 20 دقيقة، مع الإحماء وشرب الماء. إذا كان لديك مانع صحي فاستشر مختصًا قبل التمرين.";
  return "اقتراحي الآن: التزم بوجبتك التالية، اشرب الماء، وخذ حركة قصيرة. أخبرني باسم الطعام أو النشاط وسأساعدك بخطوة عملية.";
  }
