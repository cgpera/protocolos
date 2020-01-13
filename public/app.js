function registrar() {
  var displayName = document.getElementById('empresa').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  console.log(email, password)
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      //ingresar el nombre de la empresa luego de crear usuario
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: displayName
      }).then(function () {
        // Update successful.
        console.log('empresa update succesfull')
      }).catch(function (error) {
        console.log(error)
        // An error happened.
      });
      verificar()
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

function ingreso() {
  var email2 = document.getElementById('email2').value
  var password2 = document.getElementById('password2').value
  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      //    document.getElementById('quickstart-sign-in').disabled = false;
    });
}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    //    document.getElementById('quickstart-verify-email').disabled = true;
    if (user) {
      // User is signed in.
      console.log('Existe usuario activo')

      // actualizar el displayName con el nombre de la empresa

      aparece(user)
      var displayName = user.displayName;
      var email = user.email;
      console.log('**************')
      console.log(user.emailVerified)
      console.log(user)
      console.log('**************')
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      //      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      //      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      //      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      if (!emailVerified) {
        //        console.log('Existe usuario activo')
        //        document.getElementById('quickstart-verify-email').disabled = false;
      }
    } else {
      // User is signed out.
      console.log('No existe usuario activo')
      contenido.innerHTML = `
      <div class="container mt-4">
        <div class="alert alert-info" role="alert">
          Sesión no iniciada
        </div>
      </div>
      `
      //      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      //      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      //      document.getElementById('quickstart-account-details').textContent = 'null';
    }
    //    document.getElementById('quickstart-sign-in').disabled = false;
  });
}

observador();

function aparece(user) {
  var user = user
  var contenido = document.getElementById('contenido')
  document.getElementById('email2').disabled = true
  document.getElementById('password2').disabled = true
  document.getElementById('registro').disabled = true
  document.getElementById("ingreso").disabled = true
  document.getElementById("reset").disabled = true

  if (user.emailVerified) {
    contenido.innerHTML = `
      <div class="container mt-4">
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">${user.email} ${user.displayName}</h4>
          <p>A continuación estará la lista de protocolos disponibles para visualización y descarga</p>
          <hr>
            <p class="mb-0">Protocolos disponibles según administración</p>

            <table style="width:100%">
              <tr>
                <th>Fecha</th>
                <th>Tipo Protocolo</th>
                <th>Nro</th>
                <th>Download</th>
              </tr>
              <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>94</td>
                <td>94</td>
              </tr>
            </table>
        </div>
          <button onclick="cerrar()" class="btn btn-warning">Cerrar Sesión</button>
      </div>
    `
  }
}

function cerrar() {
  firebase.auth().signOut()
    .then(function () {
      //      document.querySelector('email2').disabled = false
      document.getElementById('email2').disabled = false
      document.getElementById('password2').disabled = false
      document.getElementById('registro').disabled = false
      document.getElementById("ingreso").disabled = false
      document.getElementById("reset").disabled = false
      console.log('saliendo...')
    })
    .catch(function (error) {
      console.log(error)
    })
}

function verificar() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function () {
    // Email sent.
    console.log('Enviando correo...')
  }).catch(function (error) {
    // An error happened.
    console.log(error)
  });
}

function resetPass() {
  var email = document.getElementById('emailRec').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}