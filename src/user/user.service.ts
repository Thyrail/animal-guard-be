import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService
{
    constructor(@InjectModel(User.name) private model: Model<User>) { }

    async create(dto: CreateUserDto)
    {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = new this.model({ ...dto, password: hashedPassword });
        return user.save();
    }

    findAll()
    {
        return this.model.find().select('-password').exec();
    }

    findOne(id: string)
    {
        return this.model.findById(id).select('-password').exec();
    }

    async update(id: string, dto: UpdateUserDto)
    {
        return this.model.findByIdAndUpdate(id, dto, { new: true }).select('-password').exec();
    }

    remove(id: string)
    {
        return this.model.findByIdAndDelete(id).exec();
    }

    async validateUser(email: string, password: string)
    {
        const user = await this.model.findOne({ email }).exec();
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return user;
    }

    async findByEmail(email: string)
    {
        return this.model.findOne({ email }).exec();
    }

}