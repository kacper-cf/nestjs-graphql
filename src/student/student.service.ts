import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  public async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  public async getAllStudents() {
    return this.studentRepository.find();
  }

  public async createStudent({
    firstName,
    lastName,
  }: CreateStudentInput): Promise<Student> {
    const createdStudent = this.studentRepository.create({
      firstName,
      lastName,
      id: uuid(),
    });

    await this.studentRepository.save(createdStudent);

    return createdStudent;
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
