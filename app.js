$(document).ready(function () {
    // Active Nav Link
    const activePage = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        if(link.href.includes(`${activePage}`)){
          link.classList.add('text-success');
        }
      })

    // Define the room types
    const ROOM_TYPES = {
        "standard": {
            "name": "Standard Room",
            "price": 5000
        },
        "premium": {
            "name": "Premium Room",
            "price": 10000
        }
    }

    // Define the cart
    let cart = {};

    // Add room to cart
    $(".add-to-cart").click(function () {
        let roomType = $(this).data("room-type");
        if (cart[roomType]) {
            cart[roomType]++;
        } else {
            cart[roomType] = 1;
        }
        updateCart();
    });

    // Remove room from cart
    $(document).on("click", ".remove-from-cart", function () {
        let roomType = $(this).data("room-type");
        cart[roomType]--;
        if (cart[roomType] === 0) {
            delete cart[roomType];
        }
        updateCart();
    });

    // Clear cart
    $("#clear-cart").click(function () {
        cart = {};
        updateCart();
    });

    // Update cart
    function updateCart() {
        $("#cart-items").empty();
        let totalRooms = 0;
        let totalPrice = 0;
        for (let roomType in cart) {
            let room = ROOM_TYPES[roomType];
            let roomCount = cart[roomType];
            let roomPrice = room.price * roomCount;
            totalRooms += roomCount;
            totalPrice += roomPrice;
            let itemHtml = `<li class="mb-3">${room.name} x ${roomCount} <span class="float-end"> &#8377; ${roomPrice} <button class="btn btn-danger btn-sm remove-from-cart" data-room-type="${roomType}">Remove</button></span></li>`;
            $("#cart-items").append(itemHtml);
        }
        $("#total-rooms").val(totalRooms);
    }

    // Submit booking form
    $('#booking-form').submit(function (e) {
        e.preventDefault();
        let name = $("#name").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let address = $("#address").val();
        let totalRooms = $("#total-rooms").val();
        let totalPrice = 0;

        for (let roomType in cart) {
            let room = ROOM_TYPES[roomType];
            let roomCount = cart[roomType];
            let roomPrice = room.price * roomCount;
            totalPrice += roomPrice;
        }

        let bookingData = {
            "name": name,
            "email": email,
            "phone": phone,
            "address": address,
            "totalRooms": totalRooms,
            "totalPrice": totalPrice,
            "rooms": cart
        }

        
        // User Form Validation  
        // $('.modal').removeAttr("id"); // remove modal id
        // $('#modal-button').click(function () {
            console.log(bookingData.name)
            if (bookingData.name !== '') {
                $(".modal").attr('id', 'staticBackdrop'); // Show the modal
            }
        // });

        // modal btn close id remove from modal for validation purpose
        $('.close').click(function () {
            $('.modal').removeAttr("id");
        });



        // Store the data in the local storage
        localStorage.setItem('name', bookingData.name);
        localStorage.setItem('email', bookingData.email);
        localStorage.setItem('phone', bookingData.phone);
        localStorage.setItem('address', bookingData.address);
        localStorage.setItem('rooms', bookingData.totalRooms);
        localStorage.setItem('price', bookingData.totalPrice);

        // Get the data from the local storage
        let nameEl = localStorage.getItem('name');
        let emailEl = localStorage.getItem('email');
        let addressEl = localStorage.getItem('address')
        let mobEl = localStorage.getItem('phone');
        let tRooms = localStorage.getItem('rooms');
        let tPrice = localStorage.getItem('price');

        // Display the data on the Modal
        $('#name_1').text(nameEl);
        $('#email_1').text(emailEl);
        $('#mob').text(mobEl);
        $('#address_1').text(addressEl);
        $('#room').text(tRooms);
        $('#price').text(tPrice);

        // Clear cart and form fields
        cart = {};
        updateCart();
        $("#booking-form")[0].reset();
    });

     // user goto payment page
     $('#confirmPayment').click(function () {
        window.location.href = "payment.html";
    });

    // User Debit/Credit Card Detail
    $("#btnPay").click(function () {
        let userDetails = {
            CardNo: 4444555566667777,
            CVV: 333,
            Year: 2024,
            Month: "04 Apr"
        }

        // Payment Detail Validation
        let cardnumber = document.getElementById("txtCard").value;
        let cvv = document.getElementById("txtCvv").value;
        let year = document.getElementById("lstYear").value;
        let month = document.getElementById("lstMonth").value;
        if (cardnumber === "" || cvv === "") {
            document.getElementById('error').innerText = "please enter card no. & cvv";
        } else if (cardnumber != userDetails.CardNo || cvv != userDetails.CVV) {
            document.getElementById('error').innerText = "please enter valid card no. & cvv";
        } else if (year != userDetails.Year || month != userDetails.Month) {
            document.getElementById('error').innerText = "please enter valid Expiry Date";
        } else {
            window.location.href = "success.html";
        }

    });


    $('#number').on('keydown', function (e) {
        // Allow: backspace, delete, tab, escape, enter, and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

    });

    // Contact Form Data validation
    $('#contactBtn').click(function (e) {
        e.preventDefault();
        let name = $("#name").val();
        let email = $("#email").val();
        let phone = $("#number").val();
        let msg = $("#message").val();
        const pattern = /^[6789][0-9]{9}$/;
        const emailValid =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(pattern.test(phone) && emailValid.test(email) && name !== '' && msg !== ''){
            alert("Submit SuccesFull");
        }else{
           document.getElementsByClassName('error') = "Invalid Details";
        }



    });

    
    let totalAmt = localStorage.getItem('price');
    $('#total').text(totalAmt);
    
    // Generate a random number
    let randomNumber = Math.floor(Math.random() * 999999) + 1;
    // Set the random number in the HTML
    $("#randomNumber").text(randomNumber);

        
    // Remove the data from the local storage
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('address')
    localStorage.removeItem('phone');
    localStorage.removeItem('rooms');
    localStorage.removeItem('price'); 

});

