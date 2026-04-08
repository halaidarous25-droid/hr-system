alert("APP JS LOADED");
supabase.auth.onAuthStateChange((event, session) => {
  console.log("SESSION:", session);
});
// تسجيل الدخول
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await client.auth.signInWithPassword({
  email,
  password
});

  if (error) {
    alert("خطأ في تسجيل الدخول");
  } else {
    window.location.href = "dashboard.html";
  }
}

// عرض الداشبورد
async function loadDashboard() {
  const user = (await supabase.auth.getUser()).data.user;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  document.getElementById("points").innerText =
    "النقاط: " + (data?.total_points || 0);
}

if (window.location.pathname.includes("dashboard")) {
  loadDashboard();
}

// الانتقال
function goToRequests() {
  window.location.href = "requests.html";
}

// إنشاء طلب
async function createRequest() {
  try {
    const userData = await supabase.auth.getUser();
    const user = userData.data.user;

    console.log("USER:", user);

    if (!user) {
      alert("المستخدم غير مسجل دخول");
      return;
    }

    const type = document.getElementById("type").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    console.log(type, start, end);

    const { data, error } = await supabase.from("requests").insert([
      {
        user_id: user.id,
        type: type,
        start_date: start,
        end_date: end,
        status: "pending"
      }
    ]);

    if (error) {
      console.error("INSERT ERROR:", error);
      alert(error.message);
    } else {
      console.log("SUCCESS:", data);
      alert("تم الحفظ بنجاح");
    }

  } catch (err) {
    console.error("CATCH ERROR:", err);
    alert("خطأ غير متوقع");
  }
}
window.createRequest = createRequest;
window.login = login;
const btn = document.getElementById("submitBtn");

if (btn) {
  btn.addEventListener("click", () => {
    console.log("BUTTON CLICKED");
    createRequest();
  });
}
  }
});
