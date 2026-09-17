/* =====================================================================
   NABA accounts workflow
   ---------------------------------------------------------------------
   This keeps the user experience simple while the live backend is connected.
   The account flow stays lightweight until the production backend is active.
   ===================================================================== */
(function(){

var STORE_KEY = 'naba_users';
var SESSION_KEY = 'naba_session';

function getUsers(){
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch(e){ return []; }
}
function saveUsers(users){ localStorage.setItem(STORE_KEY, JSON.stringify(users)); }
function setSession(email){ localStorage.setItem(SESSION_KEY, email); }
function getSession(){ return localStorage.getItem(SESSION_KEY); }
function clearSession(){ localStorage.removeItem(SESSION_KEY); }
function findUser(email){
  return getUsers().find(function(u){ return u.email.toLowerCase() === (email || '').toLowerCase(); });
}
function currentUser(){
  var email = getSession();
  return email ? findUser(email) : null;
}

window.nabaAuth = {
  signup: function(data){
    var users = getUsers();
    if(findUser(data.email)){
      return {ok:false, message:'An account with that email already exists — try signing in.'};
    }
    var record = Object.assign({createdAt: Date.now(), status:{}}, data);
    users.push(record);
    saveUsers(users);
    setSession(data.email);
    return {ok:true};
  },
  login: function(email){
    var user = findUser(email);
    if(!user) return {ok:false, message:'No account was found for that email. Please check the details or create a new account.'};
    setSession(email);
    return {ok:true, user:user};
  },
  logout: function(){ clearSession(); },
  currentUser: currentUser,
  getUsers: getUsers,
  countByRole: function(role){ return getUsers().filter(function(u){ return u.role === role; }).length; }
};

})();
