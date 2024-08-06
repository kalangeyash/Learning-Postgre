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
            VALUES('${username}','${email}','${password}');
        `;
        const data = await  client.query(insertQuery);
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

inserData('kamna','kamna@gmail.com','cats-are-love')