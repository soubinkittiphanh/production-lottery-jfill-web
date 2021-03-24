<?php
$conn=mysqli_connect('localhost','root','admin2020','jfill_lottery');
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  echo"succeed";
};

if($received_data->action=='insert'){
  
}

$sql="INSERT INTO `sale`(`sale_id`, `lottype_id`, `lot_ref_id`, `sale_date`, `sale_bill_id`, `sale_lucky_num`, `sale_amount`, `sale_user_id`) VALUES 
('','aaa','nnn','2021-02-27','9999','222','50000','soubin')";
if(mysqli_query($conn,$sql)){
  echo "Insert data succeed";
}else{
  echo"Error: ".$sql."<br>".mysqli_error($conn);
}
mysqli_close($conn);
?>
<!-- 
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn); -->