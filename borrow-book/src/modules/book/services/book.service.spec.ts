import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookEntities } from 'modules/book/entities';
import { BookService } from 'modules/book/services';
import { BookDto } from "modules/book/dtos";
import { Repository } from "typeorm";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

describe('BookService', () => {
  let service: BookService;
  let _bookRepository: MockRepository<BookEntities>

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

  const bookEntities2 : BookEntities = {
    id: 2,
    code: 'M002',
    title: 'Fisika Dasar',
    author: 'Mikrajuddin Abdullah',
    stock: 1,
    borrowed: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    dtoClass: BookDto,
  };

  const mockRepository = () => ({
      save: jest.fn().mockReturnThis(),
      findOneBy: jest.fn().mockReturnThis(),
      createQueryBuilder: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnThis()
      })
    })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(BookEntities),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    _bookRepository = module.get<MockRepository<BookEntities>>(getRepositoryToken(BookEntities))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get Book by id', async () => {
    jest
      .spyOn(_bookRepository, 'findOneBy')
      .mockResolvedValue(bookEntities)

    expect(
      await service.getBook(bookEntities.id),
    ).toEqual(bookEntities);
  });

  it('should update Book borrowed', async () => {
    jest.spyOn(_bookRepository, 'save').mockResolvedValue(bookEntities)
    const result = await service.updateBookBorrowed(bookEntities,1)
    expect(_bookRepository.save).toHaveBeenCalled()
  });

  it('should get AllBook', async () => {
    jest
      .spyOn(_bookRepository.createQueryBuilder(), 'getMany')
      .mockResolvedValue([bookEntities, bookEntities2])

    const result = await service.getAllAvailableBook()
    expect(_bookRepository.createQueryBuilder().getMany).toHaveBeenCalled()
    expect(_bookRepository.createQueryBuilder().where).toHaveBeenCalled()
    expect(result).toHaveLength(2)
    expect(result).toEqual([bookEntities, bookEntities2])
  })
});
