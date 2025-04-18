import type { BaseRepository } from '../../lib/repository.js'
import { userTable, type User } from '../../config/db/schema.js'
import { db } from '../../config/db/index.js'
import { eq } from 'drizzle-orm'

export interface UserEntity extends User { }

export type FindByID = {
    id: number
}

export class UserRepository implements BaseRepository<UserEntity> {

    user: UserEntity[] = []

    async findById(data: FindByID): Promise<UserEntity | null> {
        const user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, data.id))

        return user.length > 0 ? user[0] : null
    }

    async create(data: Partial<UserEntity>): Promise<UserEntity> {
        const insertUser = await db
            .insert(userTable)
            .values(data as any)
            .$returningId()

        const user = await this.findById({ id: insertUser[0].id })

        if (!user) {
            throw new Error('Failed to create user')
        }

        this.user = [user]
        return user
    }

    async update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
        await db
            .update(userTable)
            .set({ ...data, updated_at: new Date().getTime() })
            .where(eq(userTable.id, id))

        const updatedUser = await this.findById({ id })

        if (!updatedUser) {
            throw new Error(`User with id ${id} not found`)
        }

        this.user = [updatedUser]
        return updatedUser
    }

    async read(id: number): Promise<UserEntity | null> {
        return this.findById({ id })
    }


    async delete(id: number): Promise<boolean> {
        try {
            await db.delete(userTable).where(eq(userTable.id, id))
            this.user = []
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async list(): Promise<UserEntity[]> {
        return db
            .select()
            .from(userTable)
    }

}
