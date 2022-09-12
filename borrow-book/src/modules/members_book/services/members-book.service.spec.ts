import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MembersBookEntities } from 'modules/members_book/entities';
import { MembersBookService } from 'modules/members_book/services';
import { CreateMembersBookDto, MembersBookDto } from "modules/members_book/dtos";
import { Repository } from "typeorm";
import { BookEntities } from "modules/book/entities";
import { BookDto } from "modules/book/dtos";
import { MemberEntities } from "modules/members/entities";
import { MembersDto } from "modules/members/dtos";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

describe('MembersBookService', () => {
  let service: MembersBookService;
  let _membersBookRepository: MockRepository<MembersBookEntities>

  const bookEntities : BookEntities = {
    id: 1,
    code: 'M001',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
    borrowed: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    dtoClass: BookDto,
  }

  const memberEntities: MemberEntities = {
    id: 1,
    code: 'M001',
    name: 'Rico',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    dtoClass: MembersDto
  };

  const membersBookEntities : MembersBookEntities = {
    id: 1,
    member: memberEntities,
    book: bookEntities,
    is_back: false,
    borrowedAt: new Date(Date.now()),
    backedAt: null,
    dtoClass: MembersBookDto,
  };

  const membersBookDto : CreateMembersBookDto = {
    member: memberEntities,
    book: bookEntities,
    borrowedAt: new Date(Date.now()),
    is_back: false
  }

  const mockRepository = () => ({
      save: jest.fn().mockReturnThis(),
      create: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
    })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersBookService,
        {
          provide: getRepositoryToken(MembersBookEntities),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<MembersBookService>(MembersBookService);
    _membersBookRepository = module.get<MockRepository<MembersBookEntities>>(getRepositoryToken(MembersBookEntities))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create data in MembersBook', async () => {
    jest
      .spyOn(_membersBookRepository, 'save')
      .mockResolvedValue(membersBookEntities)

    expect(
      await service.create(membersBookDto),
    ).toEqual(membersBookEntities);
    expect(_membersBookRepository.create).toHaveBeenCalled()
  });

  it('should get MembersBook by Book id and is_back', async () => {
    jest.spyOn(_membersBookRepository, 'find').mockResolvedValue([membersBookEntities])
    const result = await service.getMembersBookByBookIdAndIsBack(bookEntities.id,false)
    expect(_membersBookRepository.find).toHaveBeenCalled()
    expect(result).toEqual([membersBookEntities]);
  });

  it('should get MembersBook by Member id and is_back', async () => {
    jest.spyOn(_membersBookRepository, 'find').mockResolvedValue([membersBookEntities])
    const result = await service.getMembersBookByMemberIdAndIsBack(memberEntities.id,false)
    expect(_membersBookRepository.find).toHaveBeenCalled()
    expect(result).toEqual([membersBookEntities]);
  });

  it('should update MembersBook by Member id and is_back', async () => {
    await service.updateIsBackTrue(bookEntities.id, memberEntities.id)
    expect(_membersBookRepository.update).toHaveBeenCalled()
  });

  it('should get MembersBook By Id', async() => {
    jest.spyOn(_membersBookRepository, 'find').mockResolvedValue([membersBookEntities])
    const result = await service.getById(membersBookEntities.id)
    expect(_membersBookRepository.find).toHaveBeenCalled()
    expect(result).toEqual(membersBookEntities);
  })
});
