const express =  require("express")
const bodyParser = require("body-parser")
const {graphqlHTTP}  =  require("express-graphql")
const  {buildSchema}= require("graphql")

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('/graphql',graphqlHTTP({
    schema: buildSchema(`
        type RootQuery{
            events: [String!]! 
        }
        type RootMutation{
            createEvent(name:String):String
        }
        schema{
            query: RootQuery
            mutation:RootMutation
        }
    `),
    rootValue:{
        events : ()=>{
            return['Hey',"Cooking"]
        },
        createEvent:(args)=>{
            const eventName = args.name;
            return eventName
        }
    },
    graphiql:true
}))
app.get('/',(req,res,next)=>{
    res.send("hellow world")
})
app.listen(3000)

