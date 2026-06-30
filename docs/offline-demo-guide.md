# Offline Demo Guide

## Objective

Demonstrate that RescueSync AI works completely offline.

## Steps

### Step 1

Disconnect internet.

### Step 2

Start backend.

```bash
uvicorn backend.app.main:app --reload
```

### Step 3

Start frontend.

```bash
npm run dev
```

### Step 4

Upload audio.

### Step 5

Upload image.

### Step 6

Generate structured incidents.

### Step 7

Search incidents.

### Step 8

Export CSV.

## Success Criteria

- No internet required.
- AI inference works locally.
- Database works locally.
- Dashboard functions normally.
