import { PrismaClient, Role, UserStatus, SubscriptionPlan, RoomType, RoomStatus, IdType, GuestType } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting seed...')

    // 1. Create Master Admin
    const masterPassword = await hash('password123', 12)
    const masterAdmin = await prisma.user.upsert({
        where: { email: 'master@excoka.com' },
        update: {},
        create: {
            email: 'master@excoka.com',
            name: 'Master Administrator',
            password: masterPassword,
            role: Role.MASTER_ADMIN,
            status: UserStatus.ACTIVE,
        },
    })
    console.log('Master Admin created:', masterAdmin.email)

    // 2. Create Test Tenant (Demo Property)
    const tenant = await prisma.tenant.upsert({
        where: { propertyCode: 'DEMO001' },
        update: {},
        create: {
            name: 'EXCOKA Demo Property',
            slug: 'demo-property',
            propertyCode: 'DEMO001',
            subscriptionPlan: SubscriptionPlan.ENTERPRISE,
            contactName: 'System Admin',
            contactEmail: 'admin@excoka.com',
            contactPhone: '+91-9876543210',
            address: 'Demo Address, City, State, India',
            maxRooms: 999,
            maxUsers: 999,
        },
    })
    console.log('Tenant created:', tenant.name)

    // 3. Create Tenant Admin (test@gmail.com)
    const tenantAdminPassword = await hash('test123', 12)
    const tenantAdmin = await prisma.user.upsert({
        where: { email: 'test@gmail.com' },
        update: {
            role: Role.ADMIN,
        },
        create: {
            email: 'test@gmail.com',
            name: 'Test Tenant Admin',
            password: tenantAdminPassword,
            role: Role.ADMIN,
            status: UserStatus.ACTIVE,
        },
    })

    // Link user to tenant in Membership table
    await prisma.membership.upsert({
        where: {
            tenantId_userId: {
                tenantId: tenant.id,
                userId: tenantAdmin.id,
            }
        },
        update: {},
        create: {
            tenantId: tenant.id,
            userId: tenantAdmin.id,
            role: Role.ADMIN,
        },
    })
    console.log('Tenant Admin created:', tenantAdmin.email)

    // 4. Create Sample Rooms
    const roomsData = [
        { number: '101', type: RoomType.STANDARD, floor: 1, price: 1500, status: RoomStatus.AVAILABLE },
        { number: '102', type: RoomType.STANDARD, floor: 1, price: 1500, status: RoomStatus.AVAILABLE },
        { number: '201', type: RoomType.DELUXE, floor: 2, price: 2500, status: RoomStatus.AVAILABLE },
        { number: '202', type: RoomType.DELUXE, floor: 2, price: 2500, status: RoomStatus.OCCUPIED },
        { number: '301', type: RoomType.SUITE, floor: 3, price: 5000, status: RoomStatus.MAINTENANCE },
    ]

    for (const room of roomsData) {
        await prisma.room.upsert({
            where: {
                tenantId_roomNumber: {
                    tenantId: tenant.id,
                    roomNumber: room.number,
                }
            },
            update: {},
            create: {
                tenantId: tenant.id,
                roomNumber: room.number,
                roomType: room.type,
                floor: room.floor,
                baseRate: room.price,
                status: room.status,
                amenities: ["WiFi", "TV", "AC"],
            },
        })
    }
    console.log('Sample rooms created')

    // 5. Create Sample Guest
    const guest = await prisma.guest.create({
        data: {
            tenantId: tenant.id,
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '+91-9876543210',
            idType: IdType.AADHAR,
            idNumber: '1234-5678-9012',
            guestType: GuestType.REGULAR,
        }
    })
    console.log('Sample guest created:', guest.fullName)

    // 6. Create Sample Add-ons
    const addonsData = [
        { name: 'Breakfast', price: 150, category: 'FOOD', perNight: true },
        { name: 'Airport Pickup', price: 500, category: 'TRANSPORT', perNight: false },
        { name: 'Extra Bed', price: 300, category: 'AMENITY', perNight: true },
    ]

    for (const addon of addonsData) {
        await prisma.addOn.create({
            data: {
                tenantId: tenant.id,
                name: addon.name,
                price: addon.price,
                // @ts-ignore
                category: addon.category,
                perNight: addon.perNight,
            }
        })
    }
    console.log('Sample add-ons created')
    console.log('Seeding completed.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
