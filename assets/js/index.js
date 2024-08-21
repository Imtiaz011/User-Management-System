
// Adding an User:

document.getElementById('add_user').addEventListener('submit', function(event) {
    alert("Data Inserted Successfully!");
});

// Updating an User:

// Handling the form submission for updating a user
document.getElementById('update_user').addEventListener('submit', function(event){
    // Prevent the default form submission behavior (page refresh)
    event.preventDefault();

    // Serialize the form data into an array of objects (each with 'name' and 'value' properties)
    let formData = new FormData(this);
    let data = {};

    // Map each item in the serialized array to a key-value pair in the 'data' object
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Prepare the fetch request
    fetch(`http://localhost:8000/api/users/${data.id}`, {
        method: 'PUT', // Specifing the HTTP method (PUT for updating)
        headers: {
            'Content-Type': 'application/json' // Set the Content-Type header
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        // If the request is successful, display an alert to notify the user
        alert("Data Updated Successfully!");
    })
    .catch(error => console.error('Error:', error)); // Handle any errors
});

// Deleting an User:

// Handling the deletion of a user
if (window.location.pathname === "/") {
    // Select all delete buttons within the table on the homepage
    document.querySelectorAll(".table tbody td a.delete").forEach(button => {
        button.addEventListener('click', function(){
            // Get the user ID from the 'data-id' attribute of the clicked delete button
            let id = this.getAttribute("data-id");

            // Show a confirmation dialog to the user
            if (confirm("Do you really want to delete this record?")) {
                // Prepare the fetch request
                fetch(`http://localhost:8000/api/users/${id}`, {
                    method: 'DELETE' // Specify the HTTP method (DELETE for deletion)
                })
                .then(response => response.json()) // Parse the JSON response
                .then(data => {
                    // If the request is successful, display an alert to notify the user
                    alert("Data Deleted Successfully!");
                    location.reload(); // Reload the page to reflect the deletion
                })
                .catch(error => console.error('Error:', error)); // Handle any errors
            }
        });
    });
}




/*
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:8000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:8000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}
*/