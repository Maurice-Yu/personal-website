function Profile() {
    return (
        <img
            src="https://i.imgur.com/MK3eW3As.jpg"
            alt="Katherine Johnson"
        />
    );
}
function handleClick() {

    fetch("http://127.0.0.1:8000/polls/", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            //'X-Requested-With': 'XMLHttpRequest',
        }//, //mode: "no-cors"
    })
        .then(response => {
            console.log(response.status);
            return response.json() //Convert response to JSON
        })
        .then(data => {
            console.log(data.questions)
            //Perform actions with the response data from the view
        })
        //    console.log("hello");
        //    console.log(JSON.stringify(response.json())); //Convert response to JSON
        //});
        //.then(data => {
        //    console.log(data);
        //    return "somethign";
        //    //Perform actions with the response data from the view
        //})
}
    
function Button() {
    return (<button onClick={handleClick}>click me</button>);
}
function Links() {
    return (
        <button href="https://youtube.com">youtube</button>
    );
}
    

export default function Gallery() {
    return (
        <section>
            <h1>Amazing scientists 1</h1>
            <Profile />
            <Profile />
            <Profile />
            <Links />
            <Button />
        </section>
    );
}
