/* //fetch products data and display
 fetch("http://localhost:30004/products")
   .then((res) => res.json())
   .then((data) => {
     data.forEach((i) => {
       document.querySelector(".body").innerHTML += `<tr>
                  <td>${i.product_id}</td>
                  <td>${i.title}</td>
                  <td>${i.category}</td>
                  <td>${i.description}</td>
                  <td>${i.imgURL}</td>
                  <td>${i.price}</td>
                  <td>${i.user_id}</td>
                  <td>${i.quantity}</td>
                  </tr>`;
     });
   }); */
