import { db } from '@/drizzle/db';
import { TopicTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export function getTopics() {
  return db.select().from(TopicTable).orderBy(TopicTable.order, TopicTable.name);
}

export function getTopicsByCategory(category: string) {
  return db
    .select()
    .from(TopicTable)
    .where(eq(TopicTable.category, category as typeof TopicTable.$inferSelect.category))
    .orderBy(TopicTable.order);
}

export function getTopic(id: string) {
  return db.select().from(TopicTable).where(eq(TopicTable.id, id));
}
