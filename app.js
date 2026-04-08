// تسجيل الدخول
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
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
  const user = (await supabase.auth.getUser()).data.user;

  const type = document.getElementById("type").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  await supabase.from("requests").insert([
    {
      user_id: user.id,
      type: type,
      start_date: start,
      end_date: end,
      status: "pending"
    }
  ]);

  alert("تم إرسال الطلب");
}
