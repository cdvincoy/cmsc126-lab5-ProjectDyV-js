// This part is for the time display.
function time_now(){
    let currentDate = new Date();
    const months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September",
        "October", "November", "December"];
    const weekdays = ["Sunday","Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];
    let dateString = `Today is ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}, 
    ${weekdays[currentDate.getDay()]}.<br> The current time is ${currentDate.getHours()%12 || 12}: ${currentDate.getMinutes().toString().padStart(2,"0")} ${currentDate.getHours()>=12 ?"PM" : "AM" }.`;
    document.getElementById("output-1").innerHTML = dateString;
}

//This section is for the student registration.
let students = [];
let usedNumber = [];

function Student(studentNumber, name, age, email, course){
    this.studentNumber = studentNumber;
    this.name = name;
    this.age = age;
    this.email = email;
    this.course = course;
}

function generateStudentNumber() {
    let randomDigits;
    
    do {
        randomDigits  = Math.floor(10000 + Math.random() * 90000);
    } while (usedNumber.includes(randomDigits));

    usedNumber.push(randomDigits);
    let studentNumber = "2024" + randomDigits;
    return studentNumber;
}

function submitForm(){
    let confirmed = confirm("Are you sure the information is correct and ready to submit?");
    if (!confirmed){
        return;
    }

    let name = document.getElementById("name").value;
    let age = parseInt(document.getElementById("age").value);
    let email = document.getElementById("email").value;
    let course = document.getElementById("course").value;

    let errorMessage = validateStudent(name, age, email, course);

    if (errorMessage){
        document.getElementById("output-2").innerHTML = errorMessage;
        return;
    }

    let studentNumber = generateStudentNumber();
    const student = new Student(studentNumber, name, age, email, course);

    add_student(student);
    display_student(student);
}

function validateStudent(name, age, email, course){
    if (name.length <= 5 || !name.includes(" ")){
        return "Name must be more than 5 characters and contain a space.";
    }

    if (isNaN(age) || age < 18 || age > 99){
        return "Age must be a number between 18 and 99."
    }

    if (!email.endsWith("@up.edu.ph")){
        return "Email must end with @up.edu.ph";
    }

    if (course == ""){
        return "Please select a course.";
    }

    return "";
}

function add_student(student){
    students.push(student);
    console.log("Added student:", student);
}

function display_student(student) {
    alert(`Student Added!\n
    Student Number: ${student.studentNumber}\n
    Name: ${student.name}\n
    Age: ${student.age}\n
    Email: ${student.email}\n
    Course: ${student.course}`);
}

// This section is for finding the student.
function find_student(){
    let searchId = document.getElementById("search_id").value;

    if (searchId === ""){
        alert("No ID is entered. Please try again.");
        return;
    }

    let found = students.find(s=>s.studentNumber===searchId);

    if (found){
        alert(`
        StudentID: ${found.studentNumber}\n
        Name: ${found.name}\n
        Age: ${found.age}\n
        Email: ${found.email}\n
        Course: ${found.course}
        `);
    } else {
        alert("Student record does not exist.");
    }
}

// This section is for  displaying the records of all students.
function display_list(){
    if (students.length === 0){
        document.getElementById("output-4").innerHTML = "No students found.";
        return;
    }
    let list = `<table border="1">
        <tr>
            <th>Student Number</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
        </tr>`;
    for (let s of students){
        list += `<tr>
            <td>${s.studentNumber}</td>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.email}</td>
            <td>${s.course}</td>
        </tr>`;
    }
    list += "</table";

    document.getElementById("output-4").innerHTML = list;
}

function hide_list(){
    document.getElementById("output-4").innerHTML="";
}