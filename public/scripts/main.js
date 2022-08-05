//fetch user data and display
fetch("http://localhost:6969/users")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((i) => {
      document.querySelector(".table").innerHTML += `<tr>
                 <td>${i.full_name}</td>
                 <td>${i.email}</td>
                 <td>${i.password}</td>
                 <td>${i.user_type}</td>
                 <td>${i.phone}</td>
                 <td>${i.country}</td>
                 <td>${i.billing_address}</td>
                 <td>${i.default_shipping_address}</td>
                 </tr>`;
    });
  });

