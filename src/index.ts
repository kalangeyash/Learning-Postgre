import dotenv from 'dotenv';
import { Client } from "pg";

dotenv.config() 


// console.log('HOST:', process.env.host);
// console.log('DATABASE:', process.env.database);
// console.log('USER:', process.env.user);
// console.log('PASSWORD:', process.env.password);
// console.log('PASSWORD:', process.env.connection_string);


const client = new Client({
    connectionString : process.env.connection_string
})


async function createUsersTable(){
    await client.connect()

    const result = await client.query(`
            CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
            );
        `)
        console.log(result)

    
        // client.end
        
}

// createUsersTable()

async function delTable(){
    await client.connect()
    const res = await client.query(
        `
        DROP TABLE test;
        `
    );
    
    console.log(res);
}

// delTable()

async function inserData(username:string,email:string,password:string)
{
    try{
        await client.connect()
        const insertQuery = `
            INSERT INTO users (username,email,password)
            VALUES($1,$2,$3);
        `;
        const values = [username,email,password]
        const data = await  client.query(insertQuery,values);
        console.log("Insertion 200 " + data);
    }
    catch(err)
    {
        console.error('Error during the insertion:', err);
    }
    finally{
        await client.end(); 
    }

}

// inserData('Shubham','shubham@gmail.com','kalange7007')

async function getUser(email:string) {


    try {
        await client.connect()
            
        const query = `SELECT * FROM users WHERE email = $1`;  
        const value = [email]; 
        
        const result  = await  client.query(query,value)
        
        if(result.rows.length > 0){
            console.log("Email found : " , result.rows[0])
            return result.rows[0];
        }
        else{
            console.log("No user found of that email ")
            return null
        }
    } catch (error) {
        console.error('Error during the insertion:', error);
    }

    finally{ await client.end()}
}

// getUser('shubham@gmail.com')

async function getAllUsers() {
    await client.connect()
    const query = `SELECT * FROM users`;

    const result = await client.query(query);
    console.log(result.rows)

    await client.end()
    
}
// getAllUsers()

async function changeUsername(prevUsername:string, newUsername : string){
    await client.connect();

    // const getElement = await client.query(`SELECT * FROM users ;`)
    const query = `
        UPDATE users
        SET username = $2
        WHERE username = $1;
    `
    const value = [prevUsername,newUsername];
    const result = await client.query(query,value);

    console.log(result.rows)
}
changeUsername('abhay' ,'SELECT * FROM users')