import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from 'src/utils/dto/user.dto';
import { Model } from 'mongoose';
import { User } from 'src/utils/shema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordHashHelper } from 'src/utils/helper/hash_password';
import { RegisterAuthDto } from 'src/utils/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: RegisterAuthDto) {
    const passwordGenerator = await PasswordHashHelper.hash(dto.password);
    dto.password = passwordGenerator.hash;

    const createdUser = new this.userModel({
      ...dto,
      password_key: passwordGenerator.passKey,
    });

    try {
      return await createdUser.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .select('+password_key')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordCorrect = await PasswordHashHelper.comparePassword(
      password,
      user.password_key,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto }, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User updated successfully',
      data: updatedUser,
    };
  }
}
