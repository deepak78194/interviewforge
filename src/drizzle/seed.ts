import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { TopicTable } from "./schema";

type NewTopic = typeof TopicTable.$inferInsert;

const topics: NewTopic[] = [
  // data-structures (4)
  {
    name: "Arrays & Strings",
    category: "data-structures",
    description: "Core array manipulation, sliding window, and string algorithms.",
    estimatedMinutes: 60,
    difficulty: "easy",
    order: 1,
  },
  {
    name: "Linked Lists",
    category: "data-structures",
    description: "Singly and doubly linked lists, fast/slow pointer techniques.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 2,
  },
  {
    name: "Trees & Graphs",
    category: "data-structures",
    description: "Binary trees, BSTs, DFS/BFS traversal, graph representations.",
    estimatedMinutes: 90,
    difficulty: "hard",
    order: 3,
  },
  {
    name: "Heaps & Priority Queues",
    category: "data-structures",
    description: "Min/max heaps, heap operations, and k-th element problems.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 4,
  },

  // algorithms (4)
  {
    name: "Sorting Algorithms",
    category: "algorithms",
    description: "Merge sort, quick sort, heap sort — complexity and trade-offs.",
    estimatedMinutes: 60,
    difficulty: "medium",
    order: 1,
  },
  {
    name: "Dynamic Programming",
    category: "algorithms",
    description: "Memoization, tabulation, classic DP patterns (knapsack, LCS).",
    estimatedMinutes: 90,
    difficulty: "hard",
    order: 2,
  },
  {
    name: "Binary Search",
    category: "algorithms",
    description: "Binary search on sorted arrays, search spaces, and rotated arrays.",
    estimatedMinutes: 45,
    difficulty: "easy",
    order: 3,
  },
  {
    name: "Recursion & Backtracking",
    category: "algorithms",
    description: "Recursive thinking, pruning, permutations, and combinations.",
    estimatedMinutes: 60,
    difficulty: "medium",
    order: 4,
  },

  // system-design (4)
  {
    name: "Scalability Fundamentals",
    category: "system-design",
    description: "Horizontal vs vertical scaling, load balancing, CAP theorem.",
    estimatedMinutes: 60,
    difficulty: "medium",
    order: 1,
  },
  {
    name: "Caching Strategies",
    category: "system-design",
    description: "Redis, CDN, cache eviction policies, cache invalidation patterns.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 2,
  },
  {
    name: "Designing a URL Shortener",
    category: "system-design",
    description: "Classic system design interview: hashing, storage, redirects.",
    estimatedMinutes: 60,
    difficulty: "medium",
    order: 3,
  },
  {
    name: "Microservices Architecture",
    category: "system-design",
    description: "Service decomposition, API gateways, inter-service communication.",
    estimatedMinutes: 90,
    difficulty: "hard",
    order: 4,
  },

  // behavioral (3)
  {
    name: "STAR Method",
    category: "behavioral",
    description: "Situation, Task, Action, Result framework for behavioral answers.",
    estimatedMinutes: 30,
    difficulty: "easy",
    order: 1,
  },
  {
    name: "Conflict Resolution",
    category: "behavioral",
    description: "How to discuss disagreements, difficult teammates, and trade-offs.",
    estimatedMinutes: 30,
    difficulty: "medium",
    order: 2,
  },
  {
    name: "Leadership & Ownership",
    category: "behavioral",
    description: "Demonstrating initiative, leading without authority, and ownership.",
    estimatedMinutes: 30,
    difficulty: "medium",
    order: 3,
  },

  // database (3)
  {
    name: "SQL Fundamentals",
    category: "database",
    description: "Joins, aggregations, subqueries, window functions, and indexes.",
    estimatedMinutes: 60,
    difficulty: "easy",
    order: 1,
  },
  {
    name: "Database Indexing",
    category: "database",
    description: "B-tree indexes, composite indexes, query optimization.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 2,
  },
  {
    name: "NoSQL vs Relational",
    category: "database",
    description: "When to use document, key-value, column-family, or graph DBs.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 3,
  },

  // networking (3)
  {
    name: "HTTP & HTTPS",
    category: "networking",
    description: "Request/response lifecycle, headers, status codes, TLS.",
    estimatedMinutes: 45,
    difficulty: "easy",
    order: 1,
  },
  {
    name: "REST vs GraphQL vs gRPC",
    category: "networking",
    description: "API design paradigms, trade-offs, and when to choose each.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 2,
  },
  {
    name: "WebSockets & SSE",
    category: "networking",
    description: "Real-time communication patterns and protocol details.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 3,
  },

  // object-oriented (3)
  {
    name: "SOLID Principles",
    category: "object-oriented",
    description: "Single responsibility, open/closed, Liskov, interface, dependency.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 1,
  },
  {
    name: "Design Patterns",
    category: "object-oriented",
    description: "Creational, structural, and behavioral patterns with examples.",
    estimatedMinutes: 60,
    difficulty: "hard",
    order: 2,
  },
  {
    name: "OOP vs Functional",
    category: "object-oriented",
    description: "Comparing paradigms, immutability, side effects, composition.",
    estimatedMinutes: 30,
    difficulty: "medium",
    order: 3,
  },

  // frontend (3)
  {
    name: "React Fundamentals",
    category: "frontend",
    description: "Component lifecycle, hooks, state management, and re-renders.",
    estimatedMinutes: 60,
    difficulty: "medium",
    order: 1,
  },
  {
    name: "Browser Rendering & Performance",
    category: "frontend",
    description: "Critical rendering path, reflow, repaint, Core Web Vitals.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 2,
  },
  {
    name: "Accessibility (a11y)",
    category: "frontend",
    description: "ARIA roles, keyboard navigation, semantic HTML, WCAG guidelines.",
    estimatedMinutes: 30,
    difficulty: "easy",
    order: 3,
  },

  // backend (3)
  {
    name: "Authentication & Authorization",
    category: "backend",
    description: "JWT, OAuth 2.0, session cookies, RBAC, and security best practices.",
    estimatedMinutes: 60,
    difficulty: "medium",
    order: 1,
  },
  {
    name: "Message Queues",
    category: "backend",
    description: "Kafka, RabbitMQ, SQS — async processing and reliability patterns.",
    estimatedMinutes: 45,
    difficulty: "hard",
    order: 2,
  },
  {
    name: "API Rate Limiting",
    category: "backend",
    description: "Token bucket, leaky bucket, sliding window rate-limiting algorithms.",
    estimatedMinutes: 30,
    difficulty: "medium",
    order: 3,
  },

  // language-specific (3)
  {
    name: "JavaScript Event Loop",
    category: "language-specific",
    description: "Call stack, task queue, microtask queue, promises, async/await.",
    estimatedMinutes: 45,
    difficulty: "medium",
    order: 1,
  },
  {
    name: "TypeScript Advanced Types",
    category: "language-specific",
    description: "Generics, conditional types, mapped types, template literals.",
    estimatedMinutes: 45,
    difficulty: "hard",
    order: 2,
  },
  {
    name: "Python Memory Management",
    category: "language-specific",
    description: "Reference counting, garbage collection, GIL, and generators.",
    estimatedMinutes: 30,
    difficulty: "medium",
    order: 3,
  },

  // soft-skills (3)
  {
    name: "Communication & Clarity",
    category: "soft-skills",
    description: "Explaining technical concepts to non-technical stakeholders.",
    estimatedMinutes: 30,
    difficulty: "easy",
    order: 1,
  },
  {
    name: "Time Management",
    category: "soft-skills",
    description: "Prioritization frameworks, deadlines, and managing competing tasks.",
    estimatedMinutes: 30,
    difficulty: "easy",
    order: 2,
  },
  {
    name: "Growth Mindset",
    category: "soft-skills",
    description: "Handling feedback, learning from failure, continuous improvement.",
    estimatedMinutes: 30,
    difficulty: "easy",
    order: 3,
  },
];

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn(
      "⚠️  DATABASE_URL is not set. Skipping seed — no database available."
    );
    return;
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql);

  console.log(`🌱 Seeding ${topics.length} topics...`);
  await db.insert(TopicTable).values(topics);
  console.log("✅ Seed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
