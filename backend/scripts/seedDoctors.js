import 'dotenv/config'
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'
import mongoose from 'mongoose'
import doctorModel from '../models/doctorModel.js'

const sampleDoctors = [
    ['Dr. Richard James', 'sample-doctor-1@prescripto.local', 'General physician', 'doc1.png', 50],
    ['Dr. Emily Larson', 'sample-doctor-2@prescripto.local', 'Gynecologist', 'doc2.png', 60],
    ['Dr. Sarah Patel', 'sample-doctor-3@prescripto.local', 'Dermatologist', 'doc3.png', 30],
    ['Dr. Christopher Lee', 'sample-doctor-4@prescripto.local', 'Pediatricians', 'doc4.png', 40],
    ['Dr. Jennifer Garcia', 'sample-doctor-5@prescripto.local', 'Neurologist', 'doc5.png', 50],
    ['Dr. Zoe Kelly', 'sample-doctor-6@prescripto.local', 'Gastroenterologist', 'doc11.png', 50],
    ['Dr. Andrew Williams', 'sample-doctor-andrew@prescripto.local', 'Neurologist', 'doc6.png', 50],
    ['Dr. Christopher Davis', 'sample-doctor-7@prescripto.local', 'General physician', 'doc7.png', 50],
    ['Dr. Timothy White', 'sample-doctor-8@prescripto.local', 'Gynecologist', 'doc8.png', 60],
    ['Dr. Ava Mitchell', 'sample-doctor-9@prescripto.local', 'Dermatologist', 'doc9.png', 30],
    ['Dr. Jeffrey King', 'sample-doctor-10@prescripto.local', 'Pediatricians', 'doc10.png', 40],
    ['Dr. Patrick Harris', 'sample-doctor-12@prescripto.local', 'Neurologist', 'doc12.png', 50],
    ['Dr. Chloe Evans', 'sample-doctor-13@prescripto.local', 'General physician', 'doc13.png', 50],
    ['Dr. Ryan Martinez', 'sample-doctor-14@prescripto.local', 'Gynecologist', 'doc14.png', 60],
    ['Dr. Amelia Hill', 'sample-doctor-15@prescripto.local', 'Dermatologist', 'doc15.png', 30],
]

const seedDoctors = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not configured')
    }

    await mongoose.connect(process.env.MONGODB_URI)

    const password = await bcrypt.hash(randomBytes(32).toString('hex'), 10)
    const existingDoctors = await doctorModel.find({ email: { $regex: /@prescripto\.local$/ } }).select('email')
    const existingEmails = new Set(existingDoctors.map((doctor) => doctor.email))
    const doctors = sampleDoctors.map(([name, email, speciality, image, fees], index) => ({
        name,
        email,
        password,
        image: `/src/assets/${image}`,
        speciality,
        degree: 'MBBS',
        experience: `${index + 2} Years`,
        about: `Sample ${speciality.toLowerCase()} profile for local development.` ,
        fees,
        address: { line1: '17th Cross, Richmond', line2: 'London' },
        date: Date.now(),
    })).filter((doctor) => !existingEmails.has(doctor.email))

    if (doctors.length) {
        await doctorModel.insertMany(doctors)
    }
    console.log(`Added ${doctors.length} new sample doctor(s); existing doctors and appointments were left unchanged.`)
}

seedDoctors()
    .catch((error) => {
        console.error('Doctor seeding failed:', error.message)
        process.exitCode = 1
    })
    .finally(async () => {
        await mongoose.disconnect()
    })