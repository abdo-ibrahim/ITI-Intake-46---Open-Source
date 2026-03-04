import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookmarkService } from '../services/bookmark.service';
import { CreateBookmarkDto } from '../dto/create-bookmark.dto';
import { UpdateBookmarkDto } from '../dto/update-bookmark.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.create(createBookmarkDto);
  }

  @Get()
  findAll() {
    return this.bookmarkService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookmarkService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateData: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookmarkService.delete(id);
  }
}
