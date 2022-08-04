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

      //fetch products data and display
            fetch("http://localhost:6969/products")
        .then((res) => res.json())
        .then((data) => {
          data.forEach((i) => {
            document.querySelector(".body").innerHTML += `<tr>
              <th scope="row">
                 <td>${i.product_id}</td>
                 </th>
                 <td>${i.sku}</td>
                 <td>${i.name}</td>
                 <td>${i.price}</td>
                 <td>${i.weight}</td>
                 <td>${i.descriptions}</td>
                 <td>${i.thumbnail}</td>
                 <td>${i.image}</td>
                 <td>${i.category}</td>
                 <td>${i.create_date}</td>
                 <td>${i.stock}</td>
                 </tr>`;
          });
        });