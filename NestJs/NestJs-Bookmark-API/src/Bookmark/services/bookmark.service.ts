import { Injectable, NotFoundException } from '@nestjs/common';
import { BookmarkRepository } from '../repositories/bookmark.repository';
import { CreateBookmarkDto } from '../dto/create-bookmark.dto';
import { UpdateBookmarkDto } from '../dto/update-bookmark.dto';
import { Bookmark } from '../schemas/bookmark.schema';

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async create(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    return this.bookmarkRepository.create(createBookmarkDto);
  }

  async findAll(): Promise<Bookmark[]> {
    return this.bookmarkRepository.findAll();
  }

  async findById(id: string): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.findById(id);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID ${id} not found`);
    }
    return bookmark;
  }

  async update(id: string, updateData: UpdateBookmarkDto): Promise<Bookmark> {
    const updatedBookmark = await this.bookmarkRepository.update(
      id,
      updateData,
    );
    if (!updatedBookmark) {
      throw new NotFoundException(`Bookmark with ID ${id} not found`);
    }
    return updatedBookmark;
  }

  async delete(id: string): Promise<Bookmark> {
    const deletedBookmark = await this.bookmarkRepository.delete(id);
    if (!deletedBookmark) {
      throw new NotFoundException(`Bookmark with ID ${id} not found`);
    }
    return deletedBookmark;
  }
}
