import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController
{
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() dto: CreateUserDto)
    {
        return this.userService.create(dto);
    }

    // @UseGuards(AuthGuard)
    @Get()
    findAll(@Req() req)
    {
        // console.log("✅ Authenticated User:", req.user);
        // if (!req.user || !req.user.isAdmin)
        // {
        //     throw new UnauthorizedException('Nur Admins dürfen diese Aktion ausführen');
        // }
        return this.userService.findAll();
    }

    // @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Req() req)
    {
        // console.log("✅ Authenticated User:", req.user);
        return this.userService.findOne(id);
    }

    // @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req)
    {
        // console.log("✅ Authenticated User:", req.user);
        return this.userService.update(id, dto);
    }

    // @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req)
    {
        // console.log("✅ Authenticated User:", req.user);
        return this.userService.remove(id);
    }

}