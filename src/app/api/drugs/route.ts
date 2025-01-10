import prisma from '../../../../lib/prisma';
import { drugSchema } from '../../../../lib/zod';
import { Drug } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const drugs = await prisma.drug.findMany({
            orderBy: {
                code: 'asc',
            },
        });
        return NextResponse.json(drugs);
    } catch (error) {
        console.error('Error fetching drug:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = drugSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ message: 'Invalid input', errors: result.error.errors }, { status: 400 });
        }

        const drugData = result.data;

        const newDrug = await prisma.drug.create({
            data: {
                catagory: '',
                code: drugData.code,
                name: drugData.name,
                unit: drugData.unit,
                unitf: drugData.unitf,
                units: drugData.units,
                price: drugData.price,
                prices: drugData.prices,
                description: drugData.description || '',
            },
        });

        return NextResponse.json(newDrug, { status: 201 });
    } catch (error) {
        console.error('Error adding drug:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Drug ID is required' }, { status: 400 });
        }

        const deletedDrug = await prisma.drug.delete({
            where: { id },
        });

        if (!deletedDrug) {
            return NextResponse.json({ message: 'Drug not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Drug deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting drug:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...rest } = body;
        const result = drugSchema.safeParse(rest);

        if (!result.success) {
            return NextResponse.json({ message: 'Invalid input', errors: result.error.errors }, { status: 400 });
        }

        const drugData = result.data as Drug;

        if (!id) {
            return NextResponse.json({ message: 'Drug ID is required' }, { status: 400 });
        }

        const updatedDrug = await prisma.drug.update({
            where: { id },
            data: {
                catagory: '',
                code: drugData.code,
                name: drugData.name,
                unit: drugData.unit,
                unitf: drugData.unitf,
                units: drugData.units,
                price: drugData.price,
                prices: drugData.prices,
                description: drugData.description || '',
            },
        });

        if (!updatedDrug) {
            return NextResponse.json({ message: 'Drug not found' }, { status: 404 });
        }

        return NextResponse.json(updatedDrug, { status: 200 });
    } catch (error) {
        console.error('Error updating drug:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}