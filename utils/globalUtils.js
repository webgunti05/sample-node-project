import bcrypt from 'bcrypt';
//hashed password
export const hashedPassword = async(password) => {
    const hash = await bcrypt.hash(password, 10)
    return hash;
}

//compare password
export const comparePassword = async(password, hash) => {
    const comparePass = await bcrypt.compare(password, hash);
    return comparePass;
}