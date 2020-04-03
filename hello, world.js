const author = {
    firstName: '',
    lastName: '',
    avatarUrl: '',
    citation: '',
    birthday: ''
};
const user = {
    firstName: '',
    lastName: '',
    avatarUrl: '',
    friend1: '',
    friend2: '',
    author: author
};
user.firstName = prompt("Please enter your firstname", ""); // Ask user for firstname
user.friend1 = prompt("Please enter firstname of your dear friend", ""); // Ask user for firstname
user.friend2 = prompt("Please enter firstname of your another dear friend", ""); // Ask user for firstname
//user.lastName = prompt("Please enter your lastname", ""); // Ask user for lastname
//user.avatarUrl = prompt("Please enter URL of your avatar", ""); // Ask user for avatar
const formatName = (user) => {
    if (user.lastName) {
        return user.firstName + ' ' + user.lastName;
    } else if (user.firstName) {
        return user.firstName;
    }
    return "my dear";
};

// const element2 = React.createElement(
//     'h1',
//     {className: 'greeting'},
//     'Hello, ' + formatName(user) + '!'
// );

function Welcome(props) {
    return <h3>Привет, {props.name}!</h3>;
}

function App() {
    return (
        <div>
            <Welcome name={user.firstName} />
            <Welcome name={user.friend1} />
            <Welcome name={user.friend2} />
        </div>
    );
}

const element2 = <App />;

let element = <img width={300} src={user.avatarUrl}/>;
if (!user.avatarUrl) {
    element = <img width={300} src="https://cs9.pikabu.ru/post_img/big/2017/01/31/10/1485879466110025760.jpg"/>;
}
//const element2 = <h1>Hello, {formatName(user)}!</h1>;
const element3 = <div>{element2} <br/> {element} <h2>Мы рады вас всех видеть!</h2></div>;
// ReactDOM.render(
//     element3,
//     document.getElementById('root')
// );

class Clock extends React.Component {
    constructor(props) {
        //document.write("IN CONSTRUCTOR")
        super(props);
        this.state = {date: new Date()};
        this.isFirst = true;
        this.format = props.formatD;
        this.zone = props.zone;
        if (Clock.staticProperty > 0) {
            this.isFirst = false;
        }
        ++Clock.staticProperty;
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        if (this.isFirst) {
            // document.write("this.isFirst");
            // document.write(this.format);
            // document.write(this.zone);
            return (
                <div>
                    {element3}
                    <h2>Сейчас {this.state.date.toLocaleTimeString(this.format, {timeZone: this.zone})}.</h2>
                </div>
            );
        } else {
            return <h2>Сейчас {this.state.date.toLocaleTimeString(this.format, {timeZone: this.zone})}.</h2>;
        }
    }
}

Clock.staticProperty = 0;

function AppClocks() {
    return (
        <div>
            <Clock formatD='en-US' zone="Australia/Brisbane"/>
            <Clock formatD='ru-RU' zone="Asia/Shanghai" />
            <Clock formatD='en-GB' zone="America/New_York"/>
        </div>
    );
}

ReactDOM.render(<AppClocks />, document.getElementById('root'));

function Avatar(props) {
    return (
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={formatName(props.user)}
             width={300}
        />
    );
}

function UserInfo(props) {
    return (
        <div className="AuthorInfo">
            <Avatar user={props.user} />
            <div className="AuthorInfo-name">
                {formatName(props.user)}
            </div>
        </div>
    );
}

function FavouriteAuthor(props) {
    return (
        <div className="FavAuth">
            <UserInfo user={props.author} />
            <div className="Citation">
                {props.author.citation}
            </div>
            <div className="BirthDate">
                Родился {props.author.birthday}
            </div>
        </div>
    );
}

function tick_author(){
    user.author.firstName = prompt("Имя Вашего любимого автора?", "")
    user.author.lastName = prompt("Фамилия Вашего любимого автора?", "");
    user.author.avatarUrl = prompt("Ссылка на фотографию Вашего любимого автора:", "");
    user.author.citation = prompt("Цитата Вашего любимого автора:", "");
    user.author.birthday = prompt("День рождения Вашего любимого автора:", "");

    ReactDOM.render(<FavouriteAuthor author={user.author}/>, document.getElementById('books'));
}

setTimeout(tick_author, 5000);
